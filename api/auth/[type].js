import axios from "axios";
import { getUserByGoogleId, getUserByNaverId, saveUser } from "../../lib/userUtil.js";
import { generateToken } from "../../lib/authUtil.js";

const getRandomName = async () => {
    const randomNameResponse = await axios.get(`${process.env.VITE_API_BASE_URL}/user/random`);
    return randomNameResponse.data;
};

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const { type } = req.query;

            if (type === 'google') {
                const { access_token } = req.query;

                const googleUserInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                const googleUserInfo = googleUserInfoResponse.data;

                let name = googleUserInfo.name;
                if (!name) {
                    name = await getRandomName();
                }

                let user = await getUserByGoogleId(googleUserInfo.sub);
                if (!user) {
                    const userData = {
                        googleId: googleUserInfo.sub,
                        name,
                        profile: googleUserInfo.picture
                    };

                    user = await saveUser(userData);
                }

                const token = generateToken(user);
                return res.status(200).json(token);
            } else if (type === 'naver') {
                const { code, state } = req.query;

                const tokenReponse = await axios.get('https://nid.naver.com/oauth2.0/token', {
                    params: {
                        grant_type: 'authorization_code',
                        client_id: process.env.VITE_OAUTH_NAVER_CLIENT_ID,
                        client_secret: process.env.VITE_OAUTH_NAVER_CLIENT_SECRET,
                        code: code,
                        state: state
                    }
                });

                const profileResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
                    headers: {
                        Authorization: `Bearer ${tokenReponse.data.access_token}`
                    }
                });

                const naverProfile = profileResponse.data.response;

                let name = naverProfile.nickname;
                if (!name) {
                    name = await getRandomName();
                }

                let user = await getUserByNaverId(naverProfile.id);
                if (!user) {
                    const userData = {
                        naverId: naverProfile.id,
                        name,
                        profile: naverProfile.profile_image
                    };

                    user = await saveUser(userData);
                }

                const token = generateToken(user);
                return res.status(200).json(token);
            }
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}