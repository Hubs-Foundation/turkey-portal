defmodule DashWeb.ErrorViewTest do
  use DashWeb.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 404.json" do
    assert %{errors: %{detail: "Not Found"}} ===
             render(DashWeb.ErrorView, "404.json", [])
  end

  test "renders 500.json" do
    assert %{errors: %{detail: "Internal Server Error"}} ===
             render(DashWeb.ErrorView, "500.json", [])
  end
end
