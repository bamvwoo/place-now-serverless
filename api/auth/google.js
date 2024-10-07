import axios from "axios";
import { generateToken } from "../../lib/authUtil.js";
import { getRandomName } from "../../lib/commonUtil.js";
import { getUserByGoogleId, saveUser } from "../../lib/userUtil.js";

const doPost = async (req, res) => {
    const { access_token } = req.body;

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
    res.status(200).json({ token });
};

export default async function handler(req, res) {
    try {
         if (req.method === 'POST') {
            doPost(req, res);
        } else {
            return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}