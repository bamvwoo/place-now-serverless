import { useFormContext } from "react-hook-form";

export default function useGetRegistrationForm() {

    const { getValues } = useFormContext();

    // 카테고리
    const category = {
        name: 'category',
        rules: {
            required: '카테고리를 선택해주세요'
        }
    };

    // 우편번호
    const postCode = { 
        name: 'postCode',
        placeholder: '우편번호',
        rules: {
            required: '우편번호를 입력해주세요',
            readOnly: true
        }
    };

    // 주소
    const address = { 
        name: 'address',
        placeholder: '주소',
        rules: {
            required: '주소를 입력해주세요',
            readOnly: true
        }
    };

    // 상세주소
    const buildingName = { 
        name: 'buildingName',
        placeholder: '상세주소'
    };

    // 장소명
    const name = { 
        name: 'name',
        placeholder: '장소명',
        rules: {
            required: '장소명을 입력해주세요',
            maxLength: { value: 20, message: '장소명은 최대 20자까지 입력할 수 있어요' }
        },
        defaultValue: getValues('buildingName') || ''
    };

    // 장소 관리자 여부
    const isAdmin = { 
        name: 'isAdmin'
    };

    // 장소 설명
    const description = { 
        name: 'description',
        placeholder: '설명',
        rules: {
            maxLength: { value: 200, message: '설명은 최대 200자까지 입력할 수 있어요' }
        }
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
        category,
        postCode,
        address,
        buildingName,
        name,
        isAdmin,
        description,
        images,
        thumbnail
    };
}