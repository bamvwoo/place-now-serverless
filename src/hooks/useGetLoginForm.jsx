export default function useGetLoginForm() {

    // 이메일
    const email = { 
        name: 'email',
        placeholder: '이메일 주소',
        rules: {
            required: '이메일을 입력해주세요',
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식에 맞게 입력해주세요'
            }
        }
    };

    // 비밀번호
    const password = { 
        name: 'password',
        placeholder: '비밀번호',
        rules: {
            required: '비밀번호를 입력해주세요'
        }
    };

    // 로그인 성공 여부
    const isLoginSuccess = {
        name: 'isLoginSuccess',
        rules: {
            validate: value => {
                return value || '로그인 정보를 확인해주세요'
            }
        },
        defaultValue: false
    };

    return {
        email,
        password,
        isLoginSuccess
    };
}