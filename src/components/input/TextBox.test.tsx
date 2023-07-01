import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import TextBox from "components/input/TextBox";

afterEach(cleanup);

const onChange = jest.fn();
const onFocus = jest.fn();
let textBox: RenderResult;
let input: HTMLInputElement;

async function setup() {
    textBox = render(<TextBox name="email"
                              type="email"
                              placeholder="Email Address"
                              label="Email Address"
                              onFocus={onFocus}
                              onChange={onChange}/>)
    input = await textBox.findByPlaceholderText('Email Address') as HTMLInputElement;
}

describe('<TextBox />', function () {
    beforeEach(setup);

    it('should render an input with the name "email"', function () {
        expect(document.querySelector('input')?.name).toBe('email');
    });

    it('should render an input with the type "email"', function () {
        expect(document.querySelector('input')?.type).toBe('email');
    });

    it('should render an input with placeholder "Email Address"', function () {
        expect(document.querySelector('input')?.placeholder).toBe('Email Address');
    });

    it('should render and associate input with label "Email Address"', function () {
        const label = document.querySelector('label');
        const input = document.querySelector('input');

        expect(label).toBeTruthy();

        expect(label?.htmlFor).toBe(input?.id);
        expect(label?.innerHTML).toBe('Email Address');
    });

    it('should emit onChange event on input', async function () {
        fireEvent.change(input, {target: {value: 'xxx'}});
        expect(input.value).toBe('xxx');
        expect(onChange).toBeCalled();
    });

    it('should emit onFocus event on focus', async function () {
        fireEvent.focus(input);
        expect(onFocus).toBeCalled();
    });
});
