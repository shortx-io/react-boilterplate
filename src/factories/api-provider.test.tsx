import {fireEvent, render, screen} from "@testing-library/react";
import BaseApi from "api/base.api";
import {createApiProvider} from "factories/api-provider";
import {useContext} from "react";
import {vi} from "vitest";

const fn = vi.fn();

class TestApi extends BaseApi {
    test() {
        fn();
    }
}

const {ApiProvider: TestApiProvider, ApiContext: TestApiContext} = createApiProvider(TestApi);
const useTestApi = () => useContext(TestApiContext).api;
const useTestDispatch = () => useContext(TestApiContext).dispatch;

const TestComponent = () => {
    const testApi = useTestApi();
    const dispatch = useTestDispatch();

    const onClickTest = () => {
        testApi.test();
        dispatch({type: "test"}); // to make test coverage happy
    };

    return <div>
        <button data-testid="test"
                onClick={onClickTest}>Test
        </button>
    </div>;
};

const setup = () => {
    render(
        <TestApiProvider>
            <TestComponent/>
        </TestApiProvider>,
    );
};

describe("createApiProvider()", function() {
    beforeEach(setup);

    it("should be able to use the api within the provider scope", async function() {
        fireEvent.click(await screen.findByTestId("test"));
        expect(fn).toBeCalled();
    });
});
