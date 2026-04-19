import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/lib/i18n";
import { resumeRequestCreateValidator } from "@/lib/validators/resumeRequest";

export function ResumeRequestForm() {
    const { t } = useTranslations();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({ resolver: zodResolver(resumeRequestCreateValidator) });

    const onSubmit = handleSubmit(async values => {
        // honeypot field
        if (values.siteUrl) {
            reset();
            return;
        }
        const { error } = await actions.requestResume(values);
        if (error) {
            setError("root", { message: t("error.generic") });
            return;
        }
        reset();
    });

    if (isSubmitSuccessful) {
        return (
            <div
                role="status"
                className="border-border bg-muted/30 rounded-md border px-5 py-6 text-sm"
            >
                <p className="text-foreground font-medium">
                    {t("resumeRequest.successTitle")}
                </p>
                <p className="text-muted-foreground mt-1">
                    {t("resumeRequest.successDescription")}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} noValidate>
            <FieldGroup>
                <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">
                        {t("resumeRequest.nameLabel")}
                    </FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        autoComplete="name"
                        maxLength={120}
                        {...register("name")}
                    />
                    <FieldError errors={[errors.name]} />
                </Field>
                <Field data-invalid={!!errors.workEmail}>
                    <FieldLabel htmlFor="workEmail">
                        {t("resumeRequest.workEmailLabel")}
                    </FieldLabel>
                    <Input
                        id="workEmail"
                        type="email"
                        autoComplete="email"
                        maxLength={320}
                        placeholder={t("resumeRequest.workEmailPlaceholder")}
                        {...register("workEmail")}
                    />
                    <FieldError errors={[errors.workEmail]} />
                </Field>
                <Field data-invalid={!!errors.company}>
                    <FieldLabel htmlFor="company">
                        {t("resumeRequest.companyLabel")}
                    </FieldLabel>
                    <Input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        maxLength={200}
                        {...register("company")}
                    />
                    <FieldError errors={[errors.company]} />
                </Field>
                <div aria-hidden="true" className="sr-only">
                    <label>
                        Website
                        <input
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            {...register("siteUrl")}
                        />
                    </label>
                </div>
                <Field data-invalid={!!errors.note}>
                    <FieldLabel htmlFor="note">
                        {t("resumeRequest.noteLabel")}
                        <span className="text-muted-foreground text-xs font-normal">
                            {t("common.optional")}
                        </span>
                    </FieldLabel>
                    <Textarea
                        id="note"
                        rows={4}
                        maxLength={2000}
                        placeholder={t("resumeRequest.notePlaceholder")}
                        {...register("note")}
                    />
                    <FieldError errors={[errors.note]} />
                </Field>
                <FieldError>{errors.root?.message}</FieldError>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? t("resumeRequest.submitting")
                        : t("resumeRequest.submit")}
                </Button>
            </FieldGroup>
        </form>
    );
}
