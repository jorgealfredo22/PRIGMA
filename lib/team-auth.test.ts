import { describe, it, expect, vi } from "vitest"

vi.mock("server-only", () => ({}))

import { findTeamUserByAssignee, verifyInternalApiKey, type TeamUserContact } from "./team-auth"

describe("team-auth helpers", () => {
  const mockTeamUsers: TeamUserContact[] = [
    {
      id: "usr-1",
      email: "christianmartinez3h@gmail.com",
      name: "Christian Martinez",
      phone_number: "+573001234567",
      telegram_chat_id: "12345678",
      telegram_username: "christianmartinez3h",
      metadata: {},
    },
    {
      id: "usr-2",
      email: "cristian.arismendy@pragma.com",
      name: "Cristian Arismendy",
      phone_number: "+573007654321",
      telegram_chat_id: "87654321",
      telegram_username: "cristiaris955",
      metadata: {},
    },
    {
      id: "usr-3",
      email: "daniel.rodriguez10@pragma.com",
      name: "Daniel Rodriguez",
      phone_number: null,
      telegram_chat_id: "99887766",
      telegram_username: "daniel_rodriguez",
      metadata: {},
    },
  ]

  describe("findTeamUserByAssignee", () => {
    it("should match by exact email", () => {
      const user = findTeamUserByAssignee("christianmartinez3h@gmail.com", mockTeamUsers)
      expect(user).toBeDefined()
      expect(user?.id).toBe("usr-1")
      expect(user?.telegram_chat_id).toBe("12345678")
    })

    it("should match by name", () => {
      const user = findTeamUserByAssignee("Cristian Arismendy", mockTeamUsers)
      expect(user).toBeDefined()
      expect(user?.id).toBe("usr-2")
    })

    it("should match by telegram username", () => {
      const user = findTeamUserByAssignee("@daniel_rodriguez", mockTeamUsers)
      expect(user).toBeDefined()
      expect(user?.id).toBe("usr-3")
    })

    it("should match by email prefix / alias", () => {
      const user = findTeamUserByAssignee("christian", mockTeamUsers)
      expect(user).toBeDefined()
      expect(user?.id).toBe("usr-1")
    })

    it("should return null for non-matching assignee", () => {
      const user = findTeamUserByAssignee("desconocido_xyz", mockTeamUsers)
      expect(user).toBeNull()
    })
  })

  describe("verifyInternalApiKey", () => {
    it("should reject request with missing x-api-key", () => {
      const req = new Request("http://localhost/api/internal/tasks/pending")
      expect(verifyInternalApiKey(req)).toBe(false)
    })

    it("should accept request with valid x-api-key header", () => {
      vi.stubEnv("PRIGMA_INTERNAL_API_KEY", "secret-test-key-123")
      const req = new Request("http://localhost/api/internal/tasks/pending", {
        headers: { "x-api-key": "secret-test-key-123" },
      })
      expect(verifyInternalApiKey(req)).toBe(true)
      vi.unstubAllEnvs()
    })

    it("should accept request with valid Authorization Bearer token", () => {
      vi.stubEnv("PRIGMA_INTERNAL_API_KEY", "secret-test-key-123")
      const req = new Request("http://localhost/api/internal/tasks/pending", {
        headers: { authorization: "Bearer secret-test-key-123" },
      })
      expect(verifyInternalApiKey(req)).toBe(true)
      vi.unstubAllEnvs()
    })

    it("should reject request with wrong key", () => {
      vi.stubEnv("PRIGMA_INTERNAL_API_KEY", "secret-test-key-123")
      const req = new Request("http://localhost/api/internal/tasks/pending", {
        headers: { "x-api-key": "wrong-key" },
      })
      expect(verifyInternalApiKey(req)).toBe(false)
      vi.unstubAllEnvs()
    })
  })
})
