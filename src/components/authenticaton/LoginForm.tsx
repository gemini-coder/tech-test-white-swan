import React, { useCallback, useState } from 'react';
import InputField from '../shared/InputField';
import FieldWrapper from '../shared/FieldWrapper';
import Button from '../shared/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [inputValues, setInputValues] = useState<{
        username: string;
        password: string;
    }>({ username: '', password: '' });
    const { username, password } = inputValues;

    const handleInputChange = useCallback((field: string, value: string) => {
        setInputValues((current) => {
            return { ...current, [field]: value };
        });
    }, []);

    const handleSubmitClicked = useCallback(() => {
        const processLogin = async () => {
            await auth.signIn(username, password);
        };
        setLoading(true);
        setError(null);
        processLogin()
            .then(() => {
                navigate('/');
                setLoading(false);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
    }, [auth, username, password, navigate]);

    return (
        <div className={`w-[500px] bg-slate-200 p-10`}>
            <p className={`text-center mb-5 text-2xl`}>Welcome</p>
            <form>
                <FieldWrapper label={'Username'}>
                    <InputField
                        value={username}
                        onChange={(value) =>
                            handleInputChange('username', value)
                        }
                        placeholder={`Username`}
                    />
                </FieldWrapper>
                <FieldWrapper label={'Password'}>
                    <InputField
                        value={password}
                        onChange={(value) =>
                            handleInputChange('password', value)
                        }
                        placeholder={`Password`}
                    />
                </FieldWrapper>
                <Button
                    type={'submit'}
                    fullWidth={true}
                    onClick={handleSubmitClicked}
                    disabled={username === '' || password === '' || loading}
                    text={`${loading ? 'Signing in...' : 'Login'}`}
                />
            </form>
            {error && (
                <div className={`bg-red-300 p-1 mt-3 text-center text-white`}>
                    Warning: {error}
                </div>
            )}
        </div>
    );
};

export default LoginForm;
