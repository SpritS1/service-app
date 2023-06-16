import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import DevicesPage from 'pages/DevicesPage/DevicesPage';
import AuthorizationPage from 'pages/AuthorizationPage/AuthorizationPage';
import AuthContextProvider from 'contexts/AuthContext';
import RequireAuth from 'components/RequireAuth/RequireAuth';
import Layout from 'layouts/Layout/Layout';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import UserDataContextProvider from 'contexts/UserDataContext';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import ServiceRequestsPage from 'pages/ServiceRequestsPage/ServiceRequestsPage';
import ContactPage from 'pages/ContactPage/ContactPage';
import React from 'react';

const App = () => {
    return (
        <AuthContextProvider>
            <UserDataContextProvider>
                <div className="app">
                    <BrowserRouter>
                        <Routes>
                            <Route
                                index
                                element={
                                    <RequireAuth>
                                        <Layout>
                                            <DevicesPage />
                                        </Layout>
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/service-requests"
                                element={
                                    <RequireAuth>
                                        <Layout>
                                            <ServiceRequestsPage />
                                        </Layout>
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/auth/*"
                                element={<AuthorizationPage />}
                            />
                            <Route
                                path="/contact"
                                element={
                                    <RequireAuth>
                                        <Layout>
                                            <ContactPage />
                                        </Layout>
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <RequireAuth>
                                        <Layout>
                                            <ProfilePage />
                                        </Layout>
                                    </RequireAuth>
                                }
                            />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </UserDataContextProvider>
        </AuthContextProvider>
    );
};

export default App;
