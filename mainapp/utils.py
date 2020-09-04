
from django.contrib.auth import authenticate, get_user_model
from django.middleware.csrf import CsrfViewMiddleware
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AnonymousUser

from rest_framework import authentication, HTTP_HEADER_ENCODING, exceptions

class TokenAllowAnyAuthentication(authentication.TokenAuthentication):
    """
    Allows any requests, but when token is provided,
    uses token authentication
    """

    def authenticate(self, request):
        auth = authentication.get_authorization_header(request).split()

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1:
            msg = _('Invalid token header. No credentials provided.')
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _('Invalid token header. Token string should not contain spaces.')
            raise exceptions.AuthenticationFailed(msg)
        # import pudb;
        # pudb.set_trace()
        try:
            token = auth[1].decode()
            if token == 'null':
                return (AnonymousUser(),token)
        except UnicodeError:
            msg = _('Invalid token header. Token string should not contain invalid characters.')
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)
