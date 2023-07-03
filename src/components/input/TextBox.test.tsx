import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import TextBox from "components/input/TextBox";
import {vi} from "vitest";
import "@/i18n";

afterEach(cleanup);

const onChange = vi.fn();
const onFocus = vi.fn();
let textBox: RenderResult;
let input: HTMLInputElement;

async function setup(data: { error?: boolean, message?: string }) {
    textBox = render(<TextBox name="email"
                              type="email"
                              placeholder="Email Address"
                              label="Email Address"
                              onFocus={onFocus}
                              required
                              error={data.error}
                              message={data.message}
                              defaultValue="smrockypk@gmail.com"
                              onChange={onChange}/>);
    input = await textBox.findByPlaceholderText("Email Address") as HTMLInputElement;
}

describe("<TextBox />", function() {
    beforeEach(() => setup({error: false}));

    it("should render an input with the name \"email\"", function() {
        expect(document.querySelector("input")?.name).toBe("email");
    });

    it("should render an input with the type \"email\"", function() {
        expect(document.querySelector("input")?.type).toBe("email");
    });

    it("should render an input with placeholder \"Email Address\"", function() {
        expect(document.querySelector("input")?.placeholder).toBe("Email Address");
    });

    it("should render and associate input with label \"Email Address\"", function() {
        const label = document.querySelector("label");
        const input = document.querySelector("input");

        expect(label).toBeTruthy();

        expect(label?.htmlFor).toBe(input?.id);
        expect(label?.innerHTML).toBe("Email Address");
    });

    it("should emit onChange event on input", async function() {
        fireEvent.change(input, {target: {value: "xxx"}});
        expect(input.value).toBe("xxx");
        expect(onChange).toBeCalled();
    });

    it("should emit onFocus event on focus", async function() {
        fireEvent.focus(input);
        expect(onFocus).toBeCalled();
    });

    it("should render input with given value", function() {
        expect(input.value).toBe("smrockypk@gmail.com");
    });

    it("should render input with required attribute", function() {
        expect(input.required).toBeTruthy();
    });

    it("should render input with an id", function() {
        expect(input.id).toBeTruthy();
    });

    it("should render input with without error message",function() {
        expect(document.getElementById(`email-error`)).toBeFalsy();
    });
});

describe("<TextBox error />", function() {
    const message = 'Error Message'
    beforeEach(() => setup({error: true, message}))

    it("should render input with with error message",function() {
        expect(document.getElementById(`email-error`)).toHaveTextContent(message);
    });

    it("should render input marked with red color", function() {
        expect(document.querySelector('input')).toHaveClass('text-red-900', 'ring-red-300', 'ring-inset', 'ring-1');
    });
});
