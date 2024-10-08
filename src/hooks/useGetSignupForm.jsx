import { useFormContext } from "react-hook-form";

export default function useGetSignupForm() {

    const { getValues } = useFormContext();

    // 비밀번호
    const password = { 
        name: 'password', 
        placeholder: '비밀번호',
        rules: {
            required: '비밀번호를 입력해주세요',
            minLength: {
                value: 8,
                message: '비밀번호는 최소 8자 이상으로 입력해주세요'
            },
            maxLength: {
                value: 16,
                message: '비밀번호는 최대 16자 이하로 입력해주세요'
            },
            pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|<>?{}]).{8,16}$/,
                message: '비밀번호는 영문과 숫자, 특수문자를 포함해주세요'
            }
        }
    };

    // 비밀번호 확인
    const passwordConfirm = { 
        name: 'passwordConfirm', 
        placeholder: '비밀번호 확인',
        rules: {
            required: '비밀번호를 다시 한 번 입력해주세요',
            validate: (value) => {
                if (value === getValues('password')) {
                    return true;
                } else {
                    return '비밀번호와 일치하지 않아요';
                }
            }
        }
    };

    // 비밀번호 일치 여부
    const isPasswordMatch = {
        name: 'isPasswordMatch',
        defaultValue: false
    };

    // 사용자명
    const name = {
        name: 'name',
        placeholder: '별명',
        rules: {
            required: '별명을 입력해주세요',
            maxLength: {
                value: 10,
                message: '별명은 최대 10자 이하로 입력해주세요'
            }
        }
    }

    return {
        password,
        passwordConfirm,
        isPasswordMatch,
        name
    };
}