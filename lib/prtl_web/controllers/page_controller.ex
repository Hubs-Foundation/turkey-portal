defmodule PrtlWeb.PageController do
  use PrtlWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def not_found(conn, _params) do
    render(conn, "404.html")
  end
end
