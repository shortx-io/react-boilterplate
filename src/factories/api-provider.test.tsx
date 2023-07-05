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

const TestComponent = () => {
    const testApi = useTestApi();

    return <div>
        <button data-testid="test"
                onClick={() => testApi.test()}>Test
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
