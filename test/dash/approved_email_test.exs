defmodule Dash.ApprovedEmailTest do
  use ExUnit.Case
  alias Dash.ApprovedEmail

  describe "Approved Emails" do
    @email1 "email1@email.com"
    @email2 "email2@email.com"

    test "hashed_email() should hash email address" do
      hashed_email = ApprovedEmail.hash_email(@email1)
      assert !String.equivalent?(hashed_email, @email1)
    end

    test "hashed_email() should hash 2 different email addresses uniquely" do
      assert !String.equivalent?(
               ApprovedEmail.hash_email(@email1),
               ApprovedEmail.hash_email(@email2)
             )
    end

    test "hashed_email() should hash same email address with different cases the same" do
      capitalized = String.upcase(@email1)

      assert String.equivalent?(
               ApprovedEmail.hash_email(@email1),
               ApprovedEmail.hash_email(capitalized)
             )
    end
  end
end
