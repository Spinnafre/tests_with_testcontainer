import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { UserService } from "../../services/UserService.js";
describe("UserService Unit Tests", () => {
    let mockRepository;
    let userService;
    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        };
        userService = new UserService(mockRepository);
    });
    it("should create a user successfully", async () => {
        const userData = { name: "Test User", email: "test@example.com" };
        const createdUser = { id: 1, ...userData };
        mockRepository.create.mockReturnValue(createdUser);
        mockRepository.save.mockResolvedValue(createdUser);
        const result = await userService.create(userData);
        expect(mockRepository.create).toHaveBeenCalledWith(userData);
        expect(mockRepository.save).toHaveBeenCalledWith(createdUser);
        expect(result).toEqual(createdUser);
    });
    it("should remove a user successfully", async () => {
        mockRepository.delete.mockResolvedValue({ affected: 1, raw: [] });
        const result = await userService.remove(1);
        expect(mockRepository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(1);
    });
});
//# sourceMappingURL=UserService.spec.js.map