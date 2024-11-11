import ApiService from "@core/utils/api";

const neverCheckboxFunction = async (user: number, key: string, value: unknown) => {
    const data = {[key]: value}
    console.log(data);

    await ApiService.patch(`/accounts/${user}/additionals/`, data)
}

export default neverCheckboxFunction;