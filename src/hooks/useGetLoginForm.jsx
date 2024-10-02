export default function useGetLoginForm() {

    // 이메일
    const email = { 
        name: 'email', 
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
        rules: {
            required: '비밀번호를 입력해주세요'
        }
    };

    return {
        email,
        password
    };
}