defmodule Dash.FakeHttpClient do
  @moduledoc false

  def patch(url, headers, payload, opts)
      when is_binary(url) and is_list(headers) and is_binary(payload) and is_list(opts) do
    IO.puts([IO.ANSI.cyan(), "PATCH ", url, " ", payload])
    {:ok, 200, [], ""}
  end
end
