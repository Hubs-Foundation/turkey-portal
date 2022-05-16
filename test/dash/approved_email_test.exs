defmodule Dash.ApprovedEmailTest do
  use ExUnit.Case
  alias Dash.{ApprovedEmail, Repo}
  import Ecto.Query

  setup do
    # Explicitly get a connection before each test
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
  end

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

    test "should add hashed email correctly in ApprovedEmail table" do
      ApprovedEmail.add(@email1)
      hashed_email = ApprovedEmail.hash_email(@email1)

      assert Repo.exists?(from e in ApprovedEmail, where: e.email_hash == ^hashed_email) === true
    end

    test "has_email() should return true for emails entered into the db" do
      ApprovedEmail.add(@email1)

      assert ApprovedEmail.has_email(@email1) === true
    end

    test "has_email() should return false for emails not entered into the db" do
      assert ApprovedEmail.has_email(@email1) === false
    end

    test "add() should add list of emails into db" do
      ApprovedEmail.add([@email1, @email2])

      assert ApprovedEmail.has_email(@email1) === true &&
               ApprovedEmail.has_email(@email2) === true
    end

    test "delete() should remove email from db" do
      ApprovedEmail.add(@email1)
      ApprovedEmail.delete(@email1)

      assert ApprovedEmail.has_email(@email1) === false
    end

    test "delete() should remove a list of emails" do
      ApprovedEmail.add([@email1, @email2])
      ApprovedEmail.delete([@email1, @email2])

      assert ApprovedEmail.has_email(@email1) === false &&
               ApprovedEmail.has_email(@email2) === false
    end
  end
end
