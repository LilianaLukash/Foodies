import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import PathInfo from '../../components/PathInfo/PathInfo';
import MainTitle from '../../components/MainTitle/MainTitle';
import Subtitle from '../../components/Subtitle/Subtitle';
import UserInfo from '../../components/UserInfo/UserInfo';
import TabsList from '../../components/TabsList/TabsList';
import ListItems from '../../components/ListItems/ListItems';
import ListPagination from '../../components/ListPagination/ListPagination';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeAvatar, selectUser } from '../../redux/auth/slice';
import { openModal } from '../../redux/modals/slice';
import {
  asPage,
  asUser,
  deleteRecipe,
  followUser,
  getFavoriteRecipes,
  getFollowers,
  getFollowing,
  getOwnRecipes,
  getUserById,
  getUserRecipes,
  removeFavorite,
  unfollowUser,
} from '../../api/services';
import { getErrorMessage, getId, PAGE_LIMIT } from '../../utils/helpers';
import css from './UserPage.module.css';

const EMPTY_FOLLOWERS =
  'There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.';
const EMPTY_FOLLOWING =
  'Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.';

const UserPage = () => {
  const { id } = useParams();
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isOwn = getId(currentUser) === id;

  const tabs = useMemo(
    () =>
      isOwn
        ? [
            { value: 'recipes', label: 'My recipes' },
            { value: 'favorites', label: 'My favorites' },
            { value: 'followers', label: 'Followers' },
            { value: 'following', label: 'Following' },
          ]
        : [
            { value: 'recipes', label: 'Recipes' },
            { value: 'followers', label: 'Followers' },
          ],
    [isOwn],
  );

  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState('recipes');
  const [page, setPage] = useState(1);
  const [list, setList] = useState({ items: [], totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const silentLoadRef = useRef(false);

  const refreshProfile = useCallback(async () => {
    const data = await getUserById(id);
    setProfile(asUser(data));
  }, [id]);

  const loadList = useCallback(async () => {
    const silent = silentLoadRef.current;
    silentLoadRef.current = false;
    if (!silent) setLoading(true);
    try {
      let payload;
      if (tab === 'recipes') payload = isOwn ? await getOwnRecipes(page) : await getUserRecipes(id, page);
      if (tab === 'favorites') payload = await getFavoriteRecipes(page);
      if (tab === 'followers') payload = await getFollowers(id, page);
      if (tab === 'following') payload = await getFollowing(id, page);
      setList(asPage(payload, ['recipes', 'users', 'followers', 'following']));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      if (!silent) setLoading(false);
    }
  }, [tab, page, id, isOwn]);

  useEffect(() => {
    setTab('recipes');
    setPage(1);
  }, [id]);

  useEffect(() => {
    refreshProfile().catch((error) => toast.error(getErrorMessage(error)));
  }, [refreshProfile]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const onDelete = async (recipeId) => {
    try {
      if (tab === 'favorites') await removeFavorite(recipeId);
      else await deleteRecipe(recipeId);
      const remaining = list.items.length - 1;
      if (remaining === 0 && page > 1) setPage((prev) => prev - 1);
      else await loadList();
      await refreshProfile();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onFollow = async (user, isFollowing) => {
    const targetId = getId(user);
    if (!targetId || targetId === getId(currentUser)) return;
    try {
      if (isFollowing) await unfollowUser(targetId);
      else await followUser(targetId);

      if (tab === 'following' && isFollowing) {
        if (list.items.length === 1 && page > 1) {
          silentLoadRef.current = true;
          setPage((prev) => prev - 1);
        } else {
          silentLoadRef.current = true;
          await loadList();
        }
      } else {
        setList((prev) => ({
          ...prev,
          items: prev.items.map((item) =>
            getId(item) === targetId ? { ...item, isFollowing: !isFollowing } : item,
          ),
        }));
      }
      await refreshProfile();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onFollowProfile = async () => {
    if (!profile) return;
    try {
      if (profile.isFollowing) await unfollowUser(id);
      else await followUser(id);
      await refreshProfile();
      if (tab === 'followers') {
        silentLoadRef.current = true;
        await loadList();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className={`container ${css.page}`}>
      <PathInfo page="Profile" />
      <MainTitle>Profile</MainTitle>
      <Subtitle>
        Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
      </Subtitle>
      <div className={css.layout}>
        <aside>
          {profile ? (
            <UserInfo
              user={profile}
              isOwn={isOwn}
              onAvatarChange={async (file) => {
                try {
                  await dispatch(changeAvatar(file)).unwrap();
                  await refreshProfile();
                } catch (error) {
                  toast.error(getErrorMessage({ message: error }));
                }
              }}
            />
          ) : (
            <Loader />
          )}
          {isOwn ? (
            <Button className={css.cta} onClick={() => dispatch(openModal('logOut'))}>
              Log out
            </Button>
          ) : (
            <Button className={css.cta} variant="outline" onClick={onFollowProfile}>
              {profile?.isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </aside>
        <section>
          <TabsList
            tabs={tabs}
            active={tab}
            onChange={(value) => {
              setTab(value);
              setPage(1);
            }}
          />
          {loading ? (
            <Loader />
          ) : (
            <ListItems
              type={tab === 'followers' || tab === 'following' ? 'users' : 'recipes'}
              items={list.items}
              onDelete={isOwn && (tab === 'recipes' || tab === 'favorites') ? onDelete : undefined}
              onFollow={onFollow}
              currentUserId={getId(currentUser)}
              showUnfollowOnly={tab === 'following'}
              emptyText={
                tab === 'followers' ? EMPTY_FOLLOWERS : tab === 'following' ? EMPTY_FOLLOWING : 'Nothing here yet.'
              }
            />
          )}
          {!loading && list.items.length > 0 ? (
            <ListPagination page={page} totalPages={list.totalPages} onChange={setPage} />
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default UserPage;
