import WizardForm from "../components/Registration/WizardForm";
import { useAuth } from "../context/AuthContext";
import IdentificationGuide from "../components/Registration/IdentificationGuide";

export default function Registration() {

    const { user } = useAuth();

    return(
        <>
            {
                user?.email ? (
                    <WizardForm />
                ) : (
                    <IdentificationGuide />
                )
            }
        </>
    )
}