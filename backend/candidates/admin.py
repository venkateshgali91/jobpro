from typing import Optional

from django.contrib import admin
from django.db.models import QuerySet
from django.utils.html import format_html

from backend.utils import does_file_exist
from companies.models import Company
from offers.models import Offer, OfferApplicationHistory
from users.admin import UsersAdmin

from .forms import CandidateAdminForm
from .models import Candidate


class CandidateAdmin(UsersAdmin):
    add_fieldsets = UsersAdmin.change_fields_in_add_fieldsets(
        additional_general_fields=[
            "image",
            "description",
            "github_url",
            "linkedin_url",
            "phone_number",
            "aadhar_card",
            "cv",
            "skillset",
            "quali",
            "yop",
        ],
    )
    fieldsets = UsersAdmin.change_fields_in_fieldsets(
        additional_general_fields=[
            "image",
            "description",
            "github_url",
            "linkedin_url",
            "phone_number",
            "aadhar_card",
            "cv",
            "skillset",
            "quali",
            "yop",
        ],
    )
    form = CandidateAdminForm
    list_display = [
        "image_preview",
        "email",
        "first_name",
        "last_name",
        "phone_number",
        "aadhar_card",
        "cv",
        "skillset",
        "quali",
        "yop",
        "applied_offers",
    ]
    list_display_links = ["email"]
    search_fields = ["email", "first_name", "last_name"]

    def image_preview(self, obj: Candidate) -> str:
        if not does_file_exist(obj.image):
            return "-"
        return format_html(
            '<img src="{url}" width=50px height=50px/>',
            url=obj.image.url,
        )

    def get_queryset(
        self, request, obj: Optional[Candidate] = None
    ) -> QuerySet[Candidate]:
        queryset = super().get_queryset(request)
        if not request.user.is_superuser:
            company = Company.objects.get(id=request.user.id)
            offers = Offer.objects.filter(company=company)
            candidate_ids = OfferApplicationHistory.objects.filter(
                offer__in=offers
            ).values_list("candidate_id", flat=True)
            queryset = queryset.filter(id__in=candidate_ids)
        return queryset

    def applied_offers(self, obj: Candidate) -> int:
        return obj.candidate_application_histories.count()


admin.site.register(Candidate, CandidateAdmin)
