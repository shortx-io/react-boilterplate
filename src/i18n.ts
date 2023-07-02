import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            "Login here": "Login here",
            "Sign up for a new account": "Sign up for a new account",
            "Remember me": "Remember me",
            "Forgot password?": "Forgot password?",
            "Or continue with": "Or continue with",
            "Sign in to your account": "Sign in to your account",
            "Email Address": "Email Address",
            "Password": "Password",
            "Sign in": "Sign in",
            "Sign up": "Sign up",
            "Twitter": "Twitter",
            "Github": "Github",
            "Not a member?": "Not a member?",
            "Login": "Login",
        },
    },
    bn: {
        translation: {
            "Login here": "এখানে লগইন করুন",
            "Sign up for a new account": "নতুন একাউন্ট খুলুন",
            "Remember me": "আমাকে মনে রাখো",
            "Forgot password?": "পাসওয়ার্ড ভুলে গেছেন?",
            "Or continue with": "অথবা চালিয়ে যান",
            "Sign in to your account": "আপনার অ্যাকাউন্টে সাইন ইন করুন",
            "Email Address": "ইমেল ঠিকানা",
            "Password": "পাসওয়ার্ড",
            "Sign in": "সাইন ইন করুন",
            "Sign up": "নিবন্ধন করুন",
            "Twitter": "টুইটার",
            "Github": "গিটহাব",
            "Not a member?": "সদস্য নন?",
            "Login": "লগইন",
        },
    },
    fr: {
        translation: {
            "Login here": "Connectez-vous ici",
            "Sign up for a new account": "Inscrivez-vous pour un nouveau compte",
            "Remember me": "Souviens-toi de moi",
            "Forgot password?": "Mot de passe oublié?",
            "Or continue with": "Ou continuer avec",
            "Sign in to your account": "Connectez-vous à votre compte",
            "Email Address": "Adresse e-mail",
            "Password": "Mot de passe",
            "Sign in": "Se connecter",
            "Sign up": "S'inscrire",
            "Twitter": "Twitter",
            "Github": "Github",
            "Not a member?": "Pas un membre?",
            "Login": "S'identifier",
        },
    },
    es: {
        translation: {
            "Login here": "Connectez-vous ici",
            "Sign up for a new account": "Inscrivez-vous pour un nouveau compte",
            "Remember me": "Souviens-toi de moi",
            "Forgot password?": "Mot de passe oublié?",
            "Or continue with": "Ou continuer avec",
            "Sign in to your account": "Connectez-vous à votre compte",
            "Email Address": "Adresse e-mail",
            "Password": "Mot de passe",
            "Sign in": "Se connecter",
            "Sign up": "S'inscrire",
            "Twitter": "Twitter",
            "Github": "Github",
            "Not a member?": "Pas un membre?",
            "Login": "S'identifier",
        },
    },
};

i18n
    .use(detector)
    .use(backend)
    .use(initReactI18next)
    .init({
              resources,
              fallbackLng: "en",
              saveMissing: import.meta.env.DEV,
              backend: {
                  loadPath: "/locales/{{lng}}/{{ns}}.json",
                  addPath: "/locales/add/{{lng}}/{{ns}}",
              },
          })
    .then(() => void 0);

export default i18n;
