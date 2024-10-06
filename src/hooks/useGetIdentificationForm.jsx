export default function useGetIdentificationForm() {

    // 이메일
    const email = { 
        name: 'email', 
        rules: {
            required: '이메일을 입력해주세요'
        }
    };

    // 인증 코드
    const verificationCode = { 
        name: 'verificationCode', 
        rules: {
            required: '인증코드를 입력해주세요'
        }
    };

    // 인증 여부
    const isIdentified = {
        name: 'isIdentified',
        rules: {
            validate: value => value || '인증코드가 일치하지 않아요'
        }
    }

    return {
        email,
        verificationCode,
        isIdentified
    };
}