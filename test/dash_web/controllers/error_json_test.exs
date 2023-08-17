defmodule DashWeb.ErrorJSONTest do
  use DashWeb.ConnCase, async: true

  test "renders 404" do
    assert %{errors: %{detail: "Not Found"}} ===
             DashWeb.ErrorJSON.render("404.json", %{})
  end

  test "renders 500" do
    assert %{errors: %{detail: "Internal Server Error"}} ===
             DashWeb.ErrorJSON.render("500.json", %{})
  end
end
