defmodule Dash.SubdomainDenial do
  alias Dash.NaughtyWords

  @whole_reserved_subdomains [
    "admin",
    "alertmanager",
    "api",
    "auth",
    "console",
    "dash",
    "dashboard",
    "dev",
    "email",
    "grafana",
    "haproxy",
    "hub",
    "hubs",
    "mail",
    "orch",
    "prometheus"
  ]

  @partial_reserved_subdomains [
    "mozilla",
    "mozi11a",
    "mozi1la",
    "mozil1a",
    "m0zilla",
    "m0zi11a",
    "m0zi1la",
    "m0zil1a"
  ]

  @denied_subdomains_pattern (@partial_reserved_subdomains ++ NaughtyWords.naughty_words())
                             |> Enum.map(&Regex.escape/1)
                             |> Enum.join("|")

  @denied_subdomains_regex Regex.compile!("(?:#{@denied_subdomains_pattern})", "iu")

  def is_denied_subdomain(subdomain) do
    Enum.member?(@whole_reserved_subdomains, subdomain) or
      Regex.match?(@denied_subdomains_regex, subdomain)
  end
end
