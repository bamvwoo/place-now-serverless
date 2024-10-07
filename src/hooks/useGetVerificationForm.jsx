export default function useGetVerificationForm() {

    // 이메일
    const email = { 
        name: 'email', 
        rules: {
            required: '이메일을 입력해주세요'
        }
    };

    // 이메일 중복 여부
    const isEmailDuplicated = {
        name: 'isEmailDuplicated',
        rules: {
            validate: value => !value || '이미 사용 중인 이메일 주소에요'
        }
    }

    // 인증 코드
    const verificationCode = { 
        name: 'verificationCode', 
        rules: {
            required: '인증코드를 입력해주세요'
        }
    };

    // 인증 여부
    const isVerified = {
        name: 'isVerified',
        rules: {
            validate: value => value || '인증코드가 일치하지 않아요'
        }
    }

    return {
        email,
        isEmailDuplicated,
        verificationCode,
        isVerified
    };
}