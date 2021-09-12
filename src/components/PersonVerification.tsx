import { IonContent, IonFooter, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { User } from '@baselhack2021/interfaces/models';
import { BASE_URL } from '../constants';
import { calculateAge } from '../utils';
import './PersonVerification.css';
import StepperProps from '../stepper-props';

interface Props extends StepperProps {
    user: User;
}

const PersonVerification: React.FC<Props> = ({ user, finishStep, back }) => {
    const [esc, setEsc] = useState(0);

    const incEsc = () => {
        setEsc(esc + 1);
    };

    const verifyUser = () => {
        const json = JSON.stringify({ ...user, status: true });
        fetch(`${BASE_URL}/users/${user._id}`, {
            method: 'PUT',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((_) => finishStep());
    };

    const parseBirthdate = (birthdate: Date): string => {
        return birthdate.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <>
            <IonContent>
                <div className="p-3">
                    <div className="flex flex-col items-start p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                        <div>
                            <p className="person-verification--info">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="person-verification--label">Name</p>
                        </div>
                        <div className="mt-4">
                            <p className="person-verification--info">{parseBirthdate(user.birthdate)}</p>
                            <p className="person-verification--label">Birthdate</p>
                        </div>
                        <div className="mt-4">
                            <p className="person-verification--info">{calculateAge(user.birthdate)}</p>
                            <p className="person-verification--label">Age</p>
                        </div>
                        <div className="mt-4" onClick={incEsc}>
                            {esc >= 10 ? (
                                <p className="person-verification--info esc-animation-text">{user.gender ? 'True' : 'False'}</p>
                            ) : (
                                <p className="person-verification--info">{user.gender ? 'Male' : 'Female'}</p>
                            )}
                            <p className="person-verification--label">Gender</p>
                        </div>
                    </div>
                </div>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <div className="flex">
                        <button className="w-6/12 button-secondary" onClick={back}>
                            Back
                        </button>
                        <button className="w-6/12 button-primary" onClick={verifyUser}>
                            Verify user
                        </button>
                    </div>
                </IonToolbar>
            </IonFooter>
        </>
    );
};

export default PersonVerification;
