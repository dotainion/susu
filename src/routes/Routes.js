class Susu{
    _nested = '';
    default = () => '/susu/*';
    newGroup = () => this._nested + 'create/group';
    group = (groupId = ':groupId') => this._nested + 'group/' + groupId;
    groupList = () => this._nested + 'group/list';
    viewGroup = () => this._nested + 'view/group';
    member = (memberId = ':memberId') => this._nested + 'member/' + memberId;
    memberList = () => this._nested + 'member/list';
    profile = (profileId = ':profileId') => this._nested + 'profile/' + profileId;
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