class Susu{
    _nested = '';
    default = () => '/susu/*';
    newCommunity = () => this._nested + 'create/community';
    community = (communityId = ':communityId') => this._nested + 'community/' + communityId;
    communities = () => this._nested + 'communities';
    viewCommunity = (communityId = ':communityId') => this._nested + 'view/community/' + communityId;
    member = (memberId = ':memberId') => this._nested + 'member/' + memberId;
    memberList = () => this._nested + 'member/list';
    profile = () => this._nested + 'profile';
    communitySusuWallet = (communityId = ':communityId') => this._nested + 'wallet/' + communityId;
    updateMemberSusuWallet = (communityId = ':communityId', memberId = ':memberId') => this._nested + 'update/wallet/' + communityId + '/' + memberId;
    memberSusuHistory = (susuId = ':susuId', memberId = ':memberId') => this._nested + 'member/susu/history/' + susuId + '/' + memberId;
    schedule = (communityId = ':communityId') => this._nested + 'schedule/' + communityId;
    communityMembers = (communityId = ':communityId') => this._nested + 'community/members/' + communityId;
    susuMembers = (communityId = ':communityId', susuId = ':susuId') => this._nested + 'list/of/members/' + communityId + '/' + susuId;
    associateCommunities = () => this._nested + 'associate/communities';
    dashboard = () => this._nested + 'dashboard';
    messangers = () => this._nested + 'owner/messages';
    messages = (memberId = ':memberId') => this._nested + 'messages/' + memberId;
    communityMessages = (communityId = ':communityId') => this._nested + 'community/messages/' + communityId;
    communityInvites = (communityId = ':communityId') => this._nested + 'community/invites/' + communityId;
    susuInvites = (susuId = ':susuId') => this._nested + 'susu/invites/' + susuId;
    refund = (susuId = ':susuId', memberId = ':memberId') => this._nested + 'susu/refund/' + susuId + '/member/' + memberId;
    assignSchedule = (communityId = ':communityId') => this._nested + 'assign/schedule/' + communityId;
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class NavBar{
    _nested = '';
    default = () => '/susu/nav/*';
    main = () => this._nested + 'main';
    dashboardAndOverview = () => this._nested + 'dashboardAndOverview';
    communities = () => this._nested + 'communities';
    profile = () => this._nested + 'profile';
    contributionManagement = () => this._nested + 'contributionManagement';
    messaging = () => this._nested + 'messaging';
    help = () => this._nested + 'help';
    onboarding = () => this._nested + 'onboarding';
    settings = () => this._nested + 'settings';
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Routes{
    _nested = '';
    default = () => '/';
    onboarding = () => this._nested + '/onboarding';
    signIn = () => this._nested + '/sign/in';
    register = () => this._nested + '/register';
    invited = () => this._nested + 'invited';
    susu = () => new Susu();
    nav = () => new NavBar();
}

export const routes = new Routes();