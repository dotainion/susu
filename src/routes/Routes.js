class Susu{
    _nested = '';
    default = () => '/susu/*';
    susu = (communityId = ':communityId') => this._nested + 'susu/' + communityId;
    newCommunity = () => this._nested + 'create/community';
    community = (communityId = ':communityId') => this._nested + 'community/' + communityId;
    communities = () => this._nested + 'communities';
    viewCommunity = (communityId = ':communityId') => this._nested + 'view/community/' + communityId;
    member = (memberId = ':memberId') => this._nested + 'member/' + memberId;
    memberList = () => this._nested + 'member/list';
    profile = () => this._nested + 'profile';
    contributors = (communityId = ':communityId') => this._nested + 'wallet/' + communityId;
    updateMemberSusuWallet = (communityId = ':communityId', memberId = ':memberId') => this._nested + 'update/wallet/' + communityId + '/' + memberId;
    memberSusuHistory = (susuId = ':susuId', memberId = ':memberId') => this._nested + 'member/susu/history/' + susuId + '/' + memberId;
    schedule = (communityId = ':communityId') => this._nested + 'schedule/' + communityId;
    communityMembers = (communityId = ':communityId') => this._nested + 'community/members/' + communityId;
    susuMembers = (communityId = ':communityId', susuId = ':susuId') => this._nested + 'list/of/members/' + communityId + '/' + susuId;
    associateCommunities = (memberId = ':memberId') => this._nested + 'associate/communities/' + memberId;
    dashboard = (susuId = ':susuId', communityId = ':communityId') => this._nested + 'dashboard/susu/' + susuId + '/' + communityId;
    messangers = () => this._nested + 'owner/messages';
    messages = (memberId = ':memberId') => this._nested + 'messages/' + memberId;
    communityMessages = (communityId = ':communityId') => this._nested + 'community/messages/' + communityId;
    refund = (susuId = ':susuId', memberId = ':memberId') => this._nested + 'susu/refund/' + susuId + '/member/' + memberId;
    cardRefund = (susuId = ':susuId', memberId = ':memberId', contributionId = ':contributionId') => this._nested + 'card/refund/susu/' + susuId + '/member/' + memberId + '/contribution/' + contributionId;
    assignSchedule = (communityId = ':communityId') => this._nested + 'assign/schedule/' + communityId;
    payment = (susuId = ':susuId', communityId = ':communityId', memberId = ':memberId') => this._nested + 'payment/' + susuId + '/group/' + communityId + '/member/' + memberId;
    receipt = (paymentIntentId = ':paymentIntentId', susuId = ':susuId', memberId = ':memberId') => this._nested + 'payment/receipt/' + paymentIntentId + '/susu/' + susuId + '/member/' + memberId;
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class NavBar{
    _nested = '';
    default = () => '/susu/nav/*';
    main = () => this._nested + 'main';
    managementAndOverview = () => this._nested + 'managementAndOverview';
    communities = () => this._nested + 'communities';
    profile = () => this._nested + 'profile';
    contributionManagement = () => this._nested + 'contributionManagement';
    messaging = () => this._nested + 'messaging';
    help = () => this._nested + 'help';
    landing = () => this._nested + 'home';
    settings = () => this._nested + 'settings';
    nested = () => {
        this._nested = this.default().replace('*', '');
        return this;
    }
}

class Routes{
    _nested = '';
    default = () => '/';
    landing = () => this._nested + '/home';
    about = () => this._nested + '/about/us';
    reason = () => this._nested + '/reason/for/us';
    contact = () => this._nested + '/contact/us';
    faq = () => this._nested + '/faq';
    signIn = () => this._nested + '/sign/in';
    register = () => this._nested + '/register';
    invited = () => this._nested + 'invited';
    susu = () => new Susu();
    nav = () => new NavBar();
}

export const routes = new Routes();