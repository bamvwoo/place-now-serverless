import WizardForm from "../components/Registration/WizardForm";
import { useAuth } from "../context/AuthContext";
import VerificationGuide from "../components/Registration/VerificationGuide";

export default function Registration() {

    const { user } = useAuth();

    return(
        <>
            {
                user?.email ? (
                    <WizardForm />
                ) : (
                    <VerificationGuide />
                )
            }
        </>
    )
}