import { jest } from "@jest/globals";

const mockRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findUserByEmail: jest.fn(),
    findUserById: jest.fn(),
};

jest.unstable_mockModule("../../src/utils/index.js", () => ({
    GeneratePassword: jest.fn(),
    ValidatePassword: jest.fn(),
    GenerateAccessToken: jest.fn(),
    GenerateRefreshToken: jest.fn(),
    ValidateRefreshToken: jest.fn(),
}));

jest.unstable_mockModule("../../src/database/repository/index.js", () => ({
    UserRepository: jest.fn(() => mockRepository),
}));

const {
    GeneratePassword,
    ValidatePassword,
    GenerateAccessToken,
    GenerateRefreshToken,
    ValidateRefreshToken,
} = await import("../../src/utils/index.js");

const { UserService } = await import("../../src/services/user-service.js");

import {
    UnauthorizedError,
    NotFoundError,
} from "../../src/utils/app-errors.js";


let userService;

beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService();
});



// ------------------------------------------------------------------------------------------------------------


test("register : hashes password and creates user", async () => {
    GeneratePassword.mockResolvedValue("hashed-password");
    mockRepository.create.mockResolvedValue({ _id: "1" });
    const result = await userService.register({
        email: "test@gmail.com",
        password: "plain",
    });

    expect(GeneratePassword).toHaveBeenCalledWith("plain", 10);
    expect(mockRepository.create).toHaveBeenCalled();
    expect(result._id).toBe("1");
});

test("login : throws UnauthorizedError if user does not exist", async () => {
    mockRepository.findUserByEmail.mockResolvedValue(null);

    await expect(
        userService.login({ email: "x@gmail.com", password: "123" })
    ).rejects.toBeInstanceOf(UnauthorizedError);
});

test("login : throws UnauthorizedError if password is invalid", async () => {
    mockRepository.findUserByEmail.mockResolvedValue({
        _id: "1",
        password: "hashed",
        status: "ACTIVE",
    });
    ValidatePassword.mockResolvedValue(false);

    await expect(
        userService.login({ email: "x@gmail.com", password: "wrong" })
    ).rejects.toBeInstanceOf(UnauthorizedError);
});

test("login : returns access & refresh token on success", async () => {
    const user = {
        _id: "1",
        email: "a@gmail.com",
        password: "hashed",
        role: "USER",
        status: "ACTIVE",
    };

    mockRepository.findUserByEmail.mockResolvedValue(user);
    ValidatePassword.mockResolvedValue(true);
    GenerateAccessToken.mockReturnValue("access-token");
    GenerateRefreshToken.mockReturnValue("refresh-token");
    mockRepository.update.mockResolvedValue(user);

    const result = await userService.login({
        email: "a@gmail.com",
        password: "correct",
    });
    expect(result.accessToken).toBe("access-token");
    expect(result.refreshToken).toBe("refresh-token");
});

test("refresh : throws UnauthorizedError for invalid refresh token", async () => {
    ValidateRefreshToken.mockReturnValue({ _id: "1" });
    mockRepository.findUserById.mockResolvedValue({
        _id: "1",
        refreshToken: "different-token",
    });
    await expect(
        userService.refresh("invalid-token")
    ).rejects.toBeInstanceOf(UnauthorizedError);
});
