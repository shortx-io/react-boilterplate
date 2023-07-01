import {cleanup, render} from "@testing-library/react";
import {Input} from "components/input/InputBase";

afterEach(cleanup);

const setup = () => {
    render(<Input name="test" type="email" placeholder="Email Address"/>);
}

describe('<Input />', function () {
    beforeEach(setup);

    it('should render an input', function () {
        expect(document.querySelectorAll("input").length).toBe(1);
    });

    it('should have the name "test"', function () {
        expect(document.querySelector("input")?.name).toBe("test");
    });

    it('should render input with type "email"', function () {
        expect(document.querySelector('input')?.type).toBe('email');
    });

    it('should render input with placeholder "Email Address"', function () {
        expect(document.querySelector('input')?.placeholder).toBe('Email Address');
    });
});
