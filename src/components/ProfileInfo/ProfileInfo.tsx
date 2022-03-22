import Button from 'components/Button/Button';
import InputBasic from 'components/InputBasic/InputBasic';
import Popup from 'components/Popup/Popup';
import ProfileImageInput from 'components/ProfileImageInput/ProfileImageInput';
import { database } from 'firebase.js';
import { updateProfile } from 'firebase/auth';
import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import useAuth from 'hooks/useAuth';
import usePopup from 'hooks/usePopup';
import React, { useEffect, useState } from 'react';
import './ProfileInfo.scss';

interface Props {
    userData: DocumentData | null;
}

const ProfileInfo = ({ userData }: Props) => {
    const { user } = useAuth();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState(user!.email);
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [photoUrl, setPhotoUrl] = useState<string | null>(
        user?.photoURL || null,
    );

    const [areInputsFilled, setAreInputsFilled] = useState(false);

    const {
        popupContent,
        setPopupContent,
        popupType,
        setPopupType,
        isPopupActive,
        setIsPopupActive,
        resetPopup,
    } = usePopup();

    const handleProfileUpdate = async () => {
        try {
            resetPopup();

            if (user && areInputsFilled) {
                await updateDoc(doc(database, 'users_data', user.uid), {
                    name: name,
                    surname: surname,
                    phone: phone,
                    city: city,
                    postCode: postCode,
                    companyName: companyName,
                });

                if (photoUrl)
                    await updateProfile(user, {
                        photoURL: photoUrl,
                    });
            }

            setPopupType('default');
            setPopupContent('Profile updated');
            setIsPopupActive(true);
        } catch (error) {
            setPopupType('error');
            setPopupContent(error as string);
            setIsPopupActive(true);
        }
    };

    useEffect(() => {
        if (userData) {
            setName(userData.name);
            setSurname(userData.surname);
            setPhone(userData.phone);
            setCity(userData.city);
            setPostCode(userData.postCode);
            setCompanyName(userData.companyName);
        }
    }, [userData]);

    useEffect(() => {
        const checkIfInputsFilled = () => {
            if (
                name &&
                surname &&
                email &&
                phone &&
                city &&
                postCode &&
                companyName
            )
                return true;
            else return false;
        };

        setAreInputsFilled(checkIfInputsFilled());
    }, [name, surname, email, phone, city, postCode, companyName]);

    return (
        <div className="profile-info">
            <div className="profile-info__top">
                <h3 className="profile-info__title">USER DETAILS</h3>
                <div className="profile-info__image-container">
                    <ProfileImageInput
                        photoUrl={photoUrl}
                        setPhotoUrl={setPhotoUrl}
                    />
                </div>
            </div>

            <InputBasic
                placeholder="Name"
                value={name}
                setState={setName}
                type={'text'}
                required
            />
            <InputBasic
                placeholder="Surname"
                value={surname}
                setState={setSurname}
                type={'text'}
                required
            />
            <InputBasic
                placeholder="Email"
                value={email as string}
                setState={setEmail}
                type={'email'}
                disabled={true}
            />
            <InputBasic
                placeholder="Phone"
                value={phone}
                setState={setPhone}
                type={'tel'}
                required
            />
            <InputBasic
                placeholder="City"
                value={city}
                setState={setCity}
                type={'text'}
                required
            />
            <InputBasic
                placeholder="Post Code"
                value={postCode}
                setState={setPostCode}
                type={'text'}
                required
            />
            <InputBasic
                placeholder="Company name"
                value={companyName}
                setState={setCompanyName}
                type={'text'}
            />

            <div className="profile-info__button-container">
                <Button
                    text={'Update profile'}
                    backgroundColor="blue"
                    action={handleProfileUpdate}
                    disabled={!areInputsFilled}
                />
            </div>

            <Popup
                content={popupContent}
                duration={5000}
                type={popupType}
                isActive={isPopupActive}
                setIsActive={setIsPopupActive}
            />
        </div>
    );
};

export default ProfileInfo;
