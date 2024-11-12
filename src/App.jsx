import { ConfigProvider, Switch, theme } from 'antd';
import Dashboard from './pages/Dashboard';
import { useState, useEffect } from 'react';
import { lightTheme, darkTheme } from './theme';

function App() {
    const [themeMode, setThemeMode] = useState('light');

    const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

    const getResponsiveTheme = () => {
        if (window.innerWidth <= 576) {
            return currentTheme.responsive.mobile;
        } else if (window.innerWidth <= 1024) {
            return currentTheme.responsive.tablet;
        } else {
            return currentTheme.responsive.desktop;
        }
    };

    const [currentResponsiveTheme, setCurrentResponsiveTheme] = useState(getResponsiveTheme());

    useEffect(() => {
        const handleResize = () => {
            setCurrentResponsiveTheme(getResponsiveTheme());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
            <ConfigProvider
                theme={{
                    algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        ...currentTheme,
                        paddingBase: currentResponsiveTheme.padding,
                        fontSizeBase: currentResponsiveTheme.fontSizeBase,
                        colorPrimary: currentTheme.colorPrimary,
                        colorPrimaryHover: currentTheme.colorPrimaryHover,
                        colorPrimaryActive: currentTheme.colorPrimaryActive,
                    },
                }}
            >

                <div
                    style={{
                        backgroundColor: currentTheme.colorBgBase,
                        color: currentTheme.colorText,
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    <Switch
                        checked={themeMode === 'dark'}
                        onChange={(checked) => setThemeMode(checked ? 'dark' : 'light')}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                        style={{ marginBottom: '16px' }}
                    />
                    <div style={{ width: '100%', maxWidth: '1200px', padding: currentResponsiveTheme.padding }}>
                        <Dashboard />
                    </div>
                </div>
            </ConfigProvider>
    );
}

export default App;
