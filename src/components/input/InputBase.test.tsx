import {render} from "@testing-library/react";
import {Input} from "components/input/InputBase";
import {beforeEach, describe, it} from "vitest";

const setup = () => {
    render(<Input name="test" type="email" placeholder="Email Address" defaultValue="default"/>);
};

describe("<Input />", function() {
    beforeEach(setup);

    it("should render an input", function() {
        expect(document.querySelectorAll("input").length).toBe(1);
    });

    it("should have the name \"test\"", function() {
        expect(document.querySelector("input")?.name).toBe("test");
    });

    it("should render input with type \"email\"", function() {
        expect(document.querySelector("input")?.type).toBe("email");
    });

    it("should render input with placeholder \"Email Address\"", function() {
        expect(document.querySelector("input")?.placeholder).toBe("Email Address");
    });

    it("should render input with default value", function() {
        expect(document.querySelector("input")?.value).toBe("default");
    });

    it("should render input with no label", function() {
        expect(document.querySelector("label")).toBeFalsy();
    });

    it("should render input with no id", function() {
        expect(document.querySelector("input")?.id).toBeFalsy();
    });

    it("should render input with no required attribute", function() {
        expect(document.querySelector("input")?.required).toBeFalsy();
    });
});
