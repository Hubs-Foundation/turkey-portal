defmodule DashWeb.Api.V1.RegionControllerTest do
  use DashWeb.ConnCase

  describe "show/2" do
    test "should return region if header is present", %{conn: conn} do
      conn =
        conn
        |> put_req_header(DashWeb.Api.V1.RegionController.region_header(), "DE")
        |> get("/api/v1/region")

      assert response(conn, 200) ==
               Jason.encode!(%{code: "DE"})
    end

    test "should return nil if region is not present", %{conn: conn} do
      conn = get(conn, "/api/v1/region")

      assert response(conn, 200) ==
               Jason.encode!(%{code: nil})
    end
  end
end
