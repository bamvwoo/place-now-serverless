export default function useGetRegistrationForm() {

    // 우편번호
    const postCode = { 
        name: 'postCode', 
        rules: {
            required: '우편번호를 입력해주세요',
            readOnly: true
        }
    };

    // 주소
    const address = { 
        name: 'address', 
        rules: {
            required: '주소를 입력해주세요',
            readOnly: true
        }
    };

    // 상세주소
    const detailedAddress = { 
        name: 'detailedAddress'
    };

    // 장소명
    const name = { 
        name: 'name', 
        rules: {
            required: '장소명을 입력해주세요',
            maxLength: { value: 20, message: '장소명은 최대 20자까지 입력할 수 있어요' }
        }
    };

    // 장소 관리자 여부
    const isAdmin = { 
        name: 'isAdmin'
    };

    // 이미지
    const images = { 
        name: 'images'
    };

    // 썸네일
    const thumbnail = { 
        name: 'thumbnail',
        rules: {
            required: '썸네일을 선택해주세요'
        }
    };

    return {
        postCode,
        address,
        detailedAddress,
        name,
        isAdmin,
        images,
        thumbnail
    };
}