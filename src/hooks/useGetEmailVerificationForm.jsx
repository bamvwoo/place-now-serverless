import axios from "axios";
import { useFormContext } from "react-hook-form";

export default function useGetEmailVerificationForm() {

    const { getValues } = useFormContext();

    // 이메일
    const email = { 
        name: 'email',
        placeholder: '이메일 주소',
        rules: {
            required: '이메일을 입력해주세요',
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식으로 입력해주세요'
            },
            validate: async (value) => {
                try {
                    await axios.get("/api/user", {
                        params: {
                            email: value
                        }
                    });
                    return '이미 등록된 이메일 주소에요';
                } catch (error) {
                    return true;
                }
            }
        }
    };

    // 인증 코드
    const verificationCode = { 
        name: 'verificationCode',
        placeholder: '인증코드',
        rules: {
            required: '인증코드를 입력해주세요',
            minLength: {
                value: 6,
                message: '인증코드는 6자리로 입력해주세요'
            },
            maxLength: {
                value: 6,
                message: '인증코드는 6자리로 입력해주세요'
            },
            validate: async (value) => {
                try {
                    const response = await axios.post("/api/verification", {
                        email: getValues('email'),
                        verificationCodeValue: value
                    });

                    if (response.data.result) {
                        return true;
                    } else {
                        return '인증코드가 일치하지 않아요';
                    }
                } catch (error) {
                    return '인증코드가 일치하지 않아요';
                }
            }
        }
    };

    // 인증 여부
    const isVerified = {
        name: 'isVerified',
        defaultValue: false
    }

    return {
        email,
        verificationCode,
        isVerified
    };
}