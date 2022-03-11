import Button from 'components/Button/Button';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import InputBasic from 'components/InputBasic/InputBasic';
import Loader from 'components/Loader/Loader';
import UserImage from 'components/UserImage/UserImage';
import { UserDataContext } from 'contexts/UserDataContext';
import { database } from 'firebase.js';
import { doc, updateDoc } from 'firebase/firestore';
import useAuth from 'hooks/useAuth';
import React, { useContext, useEffect, useState } from 'react';
import './ProfilePage.scss';

type Props = {};

const ProfilePage = (props: Props) => {
    const { user } = useAuth();
    const { userData, isFetching } = useContext(UserDataContext);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState(user!.email);
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleProfileUpdate = async () => {
        const areInputsFilled = () => {
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
            return false;
        };

        try {
            if (user && areInputsFilled()) {
                await updateDoc(doc(database, 'users_data', user.uid), {
                    name: name,
                    surname: surname,
                    phone: phone,
                    city: city,
                    postCode: postCode,
                    companyName: companyName,
                });
            } else console.log('no no');
        } catch (error) {
            console.error(error);
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

    return (
        <div className="profile-page">
            <HeaderDesktop title={'Your Profile'} />
            {isFetching && <Loader />}
            {!isFetching && (
                <div className="profile-page__main">
                    <div className="profile-page__profile-info">
                        <div className="profile-page__top">
                            <h3 className="profile-page__profile-info-title">
                                USER DETAILS
                            </h3>
                            <div className="profile-page__image-container">
                                <UserImage isEditable={true} />
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

                        <div className="profile-page__buttons-container">
                            <Button
                                text={'Update profile'}
                                backgroundColor="blue"
                                action={handleProfileUpdate}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
