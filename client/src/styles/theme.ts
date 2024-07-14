import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#DA0037',
        },
        background: {
            default: '#171717',
            paper: '#EDEDED',
        },
        text: {
            primary: '#171717',
            secondary: '#444444',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButton-containedPrimary': {
                        color: '#FFFFFF',
                        borderRadius: '0.6rem',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderRadius: '0.7rem',
                            borderColor: 'transparent',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#444444',
                        },
                    },
                    '& .MuiOutlinedInput-input': {
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0.7rem',
                        '&:-webkit-autofill': {
                            '-webkit-box-shadow': '0 0 0 100px #FFFFFF inset',
                            '-webkit-text-fill-color': '#444444',
                        },
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#444444',
                    '&.Mui-focused': {
                        color: '#444444',
                    },
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: '0.8rem',
                },
            },
        },
    },
});

export default theme;
