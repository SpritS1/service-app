import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import DevicesPage from 'pages/DevicesPage/DevicesPage';
import AuthorizationPage from 'pages/AuthorizationPage/AuthorizationPage';
import AuthContextProvider from 'contexts/AuthContext';
import RequireAuth from 'components/RequireAuth/RequireAuth';
import Layout from 'Layout/Layout';
import ProfilePage from 'pages/ProfilePage/ProfilePage';

const App = () => {
    return (
        <AuthContextProvider>
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
                        <Route path="/auth/*" element={<AuthorizationPage />} />
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
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthContextProvider>
    );
};

export default App;
