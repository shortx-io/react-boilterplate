import matchers from "@testing-library/jest-dom/matchers";
import {cleanup} from "@testing-library/react";
import {afterEach, expect} from "vitest";
import MockServer from "../plugins/mock-server/server";

expect.extend(matchers);

export let server: MockServer;

afterEach(() => {
    cleanup();
});
