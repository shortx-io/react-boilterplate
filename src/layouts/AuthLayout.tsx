import {PropsWithChildren} from "react";
import {Title} from "react-head";

type AuthLayoutProps = PropsWithChildren<{title: string, heading: string}>;

export default function AuthLayout(props: AuthLayoutProps) {
    return <>
        <Title>{props.title}</Title>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {props.heading}
                </h2>
            </div>

            {props.children}
        </div>
    </>;
}
