import * as React from "react"
import { useState } from "react"
import { DatePicker, Input, Select } from "antd"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import styles from "./mainSearch.module.scss"
import { PinkButton } from "../ui/pinkButton"
import { DatePickerIcon } from "../../../public/svg/datePicker"
import { useTranslations } from "next-intl"

interface SearchFormState {
    date: Dayjs | null
    name: string
    cinemas: string
    city: string
}

function MainSearch() {
    const t = useTranslations("MainSearch")
    const [searchState, setSearchState] = useState<SearchFormState>({
        date: dayjs(),
        name: "",
        cinemas: "",
        city: ""
    })

    const handleDateChange = (date: Dayjs | null) => {
        setSearchState(prev => ({ ...prev, date }))
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchState(prev => ({ ...prev, name: e.target.value }))
    }

    const handleCinemasChange = (value: string) => {
        setSearchState(prev => ({ ...prev, cinemas: value }))
    }

    const handleCityChange = (value: string) => {
        setSearchState(prev => ({ ...prev, city: value }))
    }

    // Placeholder data - replace with actual API data
    const cinemasOptions = [
        { value: "cinema1", label: "Կինոթատրոն 1" },
        { value: "cinema2", label: "Կինոթատրոն 2" },
        { value: "cinema3", label: "Կինոթատրոն 3" },
    ]

    const citiesOptions = [
        { value: "yerevan", label: "Երևան" },
        { value: "gyumri", label: "Գյումրի" },
        { value: "vanadzor", label: "Վանաձոր" },
    ]

    return (
        <div className={styles.mainSearchContainer}>
            <div className={styles.mainSearchInputContainer}>
                <div className={styles.mainSearchInputItem}>
                    <p>{t("cinemaDate")}</p>
                    <div className={styles.datePickerWrapper}>
                        <DatePickerIcon />
                        <DatePicker
                            className={styles.datePicker}
                            value={searchState.date}
                            onChange={handleDateChange}
                            format="DD/MM/YYYY"
                            placeholder={t("cinemaDate")}
                        />
                    </div>
                </div>
                <div className={styles.mainSearchInputItem}>
                    <p>{t("cinemaName")}</p>
                    <Input
                        className={styles.textInput}
                        value={searchState.name}
                        onChange={handleNameChange}
                        placeholder={t("cinemaName")}
                    />
                </div>
                <div className={styles.mainSearchInputItem}>
                    <p>{t("cinemas")}</p>
                    <Select
                        dropdownStyle={{ 
        minWidth: '200px', 
        backgroundColor: '#d6d6d6' 
    }}
                        className={styles.selectInput}
                        value={searchState.cinemas || undefined}
                        onChange={handleCinemasChange}
                        placeholder={t("cinemas")}
                        options={cinemasOptions}
                    />
                </div>
                <div className={styles.mainSearchInputItem}>
                    <p>{t("city")}</p>
                    <Select
                        dropdownStyle={{ 
        minWidth: '200px', 
        backgroundColor: '#d6d6d6' 
    }}
                        className={styles.selectInput}
                        value={searchState.city || undefined}
                        onChange={handleCityChange}
                        placeholder={t("city")}
                        options={citiesOptions}
                    />
                </div>
            </div>
            <PinkButton height="40px">
                <span>{t("search")}</span>
            </PinkButton>
        </div>
    )
}

export { MainSearch }
