defmodule DashWeb.Api.V1.RegionControllerTest do
  use DashWeb.ConnCase

  describe "index/2" do
    @tag marked: true
    test "should return region if header is present", %{conn: conn} do
      conn =
        conn
        |> put_req_header(DashWeb.Api.V1.RegionController.region_header(), "DE")
        |> get("/api/v1/region")

      assert response(conn, 200) ==
               Jason.encode!(%{region: "DE"})
    end

    @tag marked: true
    test "should return nil if region is not present", %{conn: conn} do
      conn = get(conn, "/api/v1/region")

      assert response(conn, 200) ==
               Jason.encode!(%{region: nil})
    end
  end
end
