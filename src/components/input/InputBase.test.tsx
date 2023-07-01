import {render} from "@testing-library/react";
import {Input} from "components/input/InputBase";

describe('render with default parameters', function () {
    render(<Input name="test"/>);

    it('should render an input', function () {
        expect(document.getElementsByTagName("input").length).toBe(1);
    });

    it('should have the name "test"', function () {
        expect(document.getElementsByTagName("input")[0].name).toBe("test");
    });

    it('should have the type "text"', function () {
        expect(document.getElementsByTagName("input")[0].type).toBe("text");
    });

    it('should not render a label', function() {
        expect(document.getElementsByTagName("label")).toBeFalsy();
    });
});

describe('render with custom parameters', function () {
    render(<Input name="test" type="email" placeholder="Email Address"/>);

    it('should render input with type "email"', function () {
        expect(document.getElementsByTagName('input')[0].type).toBe('email');
    });

    it('should render input with placeholder "Email Address"', function () {
        expect(document.getElementsByTagName('input')[0].type).toBe('Email Address');
    });
});
