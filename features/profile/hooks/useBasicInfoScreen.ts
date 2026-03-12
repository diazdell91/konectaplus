import { ME, MeData, UPSERT_MY_PROFILE, UpsertMyProfileData, UpsertMyProfileVars } from "@/graphql/me";
import { useMutation, useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { toast } from "sonner-native";

export function useBasicInfoScreen() {
  const { data, loading } = useQuery<MeData>(ME, {
    fetchPolicy: "cache-and-network",
  });

  const [upsertProfile, { loading: saving }] = useMutation<
    UpsertMyProfileData,
    UpsertMyProfileVars
  >(UPSERT_MY_PROFILE, {
    refetchQueries: [{ query: ME }],
    onCompleted: () => toast.success("Perfil actualizado"),
    onError: (err) => toast.error(err.message ?? "Error al guardar"),
  });

  const me = data?.me;
  const profile = me?.profile;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName ?? "");
      setLastName(profile.lastName ?? "");
    }
  }, [profile]);

  const isDirty =
    firstName.trim() !== (profile?.firstName ?? "") ||
    lastName.trim() !== (profile?.lastName ?? "");

  const handleSave = async () => {
    await upsertProfile({
      variables: {
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
      },
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setFirstName(profile?.firstName ?? "");
    setLastName(profile?.lastName ?? "");
    setEditing(false);
  };

  return {
    me,
    profile,
    loading,
    saving,
    editing,
    setEditing,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isDirty,
    handleSave,
    handleCancel,
  };
}
