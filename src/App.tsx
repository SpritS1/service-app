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
                                    <Layout>
                                        <RequireAuth>
                                            <DevicesPage />
                                        </RequireAuth>
                                    </Layout>
                                }
                            />
                            <Route
                                path="/service-requests"
                                element={
                                    <Layout>
                                        <RequireAuth>
                                            <ServiceRequestsPage />
                                        </RequireAuth>
                                    </Layout>
                                }
                            />
                            <Route
                                path="/auth/*"
                                element={<AuthorizationPage />}
                            />
                            <Route
                                path="/contact"
                                element={
                                    <Layout>
                                        <RequireAuth>
                                            <ContactPage />
                                        </RequireAuth>
                                    </Layout>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <Layout>
                                        <RequireAuth>
                                            <ProfilePage />
                                        </RequireAuth>
                                    </Layout>
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
