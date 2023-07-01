import {render} from "@testing-library/react";
import TextBox from "components/input/TextBox";

describe('TextBox', function () {
    render(<TextBox name="email" type="email" placeholder="Email Address" label="Email Address" /> )

    it('should render an input with the name "email"', function() {
        expect(document.getElementsByTagName('input')[0].name).toBe('email');
    });

    it('should render an input with the type "email"', function() {
        expect(document.getElementsByTagName('input')[0].type).toBe('email');
    });

    it('should render an input with placeholder "Email Address"', function() {
        expect(document.getElementsByTagName('input')[0].placeholder).toBe('Email Address');
    });

    it('should render and associate input with label "Email Address"', function() {
        const label = document.getElementsByTagName('label')[0];
        const input = document.getElementsByTagName('input')[0];

        expect(label).toBeTruthy();

        expect(label.htmlFor).toBe(input.id);

        expect(label.innerText).toBe('Email Address');
    });
});