class Susu{
    _nested = '';
    default = () => '/susu/*';
    newGroup = () => this._nested + 'create/group';
    group = (groupId = ':groupId') => this._nested + 'group/' + groupId;
    groupList = () => this._nested + 'group/list';
    viewGroup = (groupId = ':groupId') => this._nested + 'view/group/' + groupId;
    member = (memberId = ':memberId') => this._nested + 'member/' + memberId;
    memberList = () => this._nested + 'member/list';
    profile = () => this._nested + 'profile';
    groupSusuWallet = (groupId = ':groupId') => this._nested + 'wallet/' + groupId;
    updateMemberSusuWallet = (groupId = ':groupId', memberId = ':memberId') => this._nested + 'update/wallet/' + groupId + '/' + memberId;
    memberSusuHistory = (susuId = ':susuId', memberId = ':memberId') => this._nested + 'member/susu/history/' + susuId + '/' + memberId;
    schedule = (groupId = ':groupId') => this._nested + 'schedule/' + groupId;
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
    susu = () => new Susu();
}

export const routes = new Routes();